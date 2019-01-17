export default class UrlParams {
  constructor(prefix, paramsEx, defaultObj, bHash = true, defaultParam = '') {
    const params = [...paramsEx, 'org_id'];
    if (params && Array.isArray(params)) {
      this.params = params.reduce((accumulator, currentValue) => {
        if (prefix) {
          accumulator[currentValue] = prefix + '-' + currentValue;
        } else {
          accumulator[currentValue] = currentValue;
        }
        return accumulator;
      }, {});
    }
    this.defaultObj = defaultObj;
    this._bHash = bHash;
    this.org_id = gon.organization_id;
    this.defaultParam = defaultParam;
  }

  readFromUrl() {
    let reset = false;
    let urlObj = {};
    _.keys(this.params).forEach((key) => {
      urlObj[key] = this.readUrlParam(this.params[key]);

      if (urlObj[key] === 'true') {
        urlObj[key] = true;
      } else if (urlObj[key] === 'false') {
        urlObj[key] = false;
      } else if (!isNaN(urlObj[key])) {
        urlObj[key] = Number(urlObj[key]);
      }

      if (this._bHash && key == 'org_id' && urlObj[key] !== undefined && urlObj[key] != this.org_id) {
        reset = true;
      }

      if (urlObj[key] === undefined || key == 'org_id') {
        delete urlObj[key];
      }

    });

    const retObj = reset ? this.defaultObj : { ...this.defaultObj, ...urlObj };

    if (reset) {
      this.writeToUrl(this.defaultObj);
    } else if (_.keys(urlObj).length < _.keys(this.defaultObj).length) {
      this.writeToUrl(retObj);
    }

    return retObj;
  }

  removeFromUrl(inputObj) {

    const urlObj = this.readUrlParams();
    _.keys(this.params).forEach((key) => {

        const found = inputObj.find((k) => {
          return k === key;
        });

        if (found) {
          delete urlObj[this.params[found]];
        }
      });

    const outputObj = { ...urlObj };

    let newUrl = '';

    if (this._bHash) {
      let newHash = window.location.hash.replace(new RegExp('\\?.*'), '');
      let mark = '?';
      _.keys(outputObj).forEach((key, index) => {
          if (outputObj[key] !== undefined) {
              newHash += mark;
              newHash += key + "=" + outputObj[key];
              mark = '&';
          }
        });

      newUrl = window.location.href.replace(new RegExp('#.*$'), newHash);

    } else {
      newUrl = window.location.href.replace(new RegExp('(\\?.*)|(#.*)|$'), '');
      let mark = '?';
      _.keys(outputObj).forEach((key, index) => {
          if (outputObj[key] !== undefined) {
              newUrl += mark;
              newUrl += key + "=" + outputObj[key];
              mark = '&';
          }
        });

      newUrl += window.location.hash;
    }

    window.history.pushState("", "", newUrl);
  }

  writeToUrl(inputObj) {
    const appendedObj = this._bHash ? { ...inputObj, 'org_id': this.org_id } : { ...inputObj };
    const validObj = {};
    _.keys(appendedObj).forEach((key) => {
      if (appendedObj[key] !== undefined) {
        validObj[this.params[key]] = appendedObj[key];
      }
    });

    const urlObj = this.readUrlParams();
    _.keys(this.params).forEach((key) => {
        if (this.params[key] !== undefined && urlObj[this.params[key]] === undefined) {
          delete urlObj[this.params[key]];
        }
      });

    const outputObj = {...urlObj, ...validObj };

    let newUrl = '';

    if (this._bHash) {
      let newHash = window.location.hash.replace(new RegExp('\\?.*'), '');
      let mark = '?';
      _.keys(outputObj).forEach((key, index) => {
          if (outputObj[key] !== undefined) {
              newHash += mark;
              newHash += key + "=" + outputObj[key];
              mark = '&';
          }
        });

      newUrl = window.location.href.replace(new RegExp('#.*$'), newHash);

    } else {
      newUrl = window.location.href.replace(new RegExp('(\\?.*)|(#.*)|$'), '');
      let mark = '?';
      _.keys(outputObj).forEach((key, index) => {
          if (outputObj[key] !== undefined) {
              newUrl += mark;
              newUrl += key + "=" + outputObj[key];
              mark = '&';
          }
        });

      newUrl += window.location.hash;
    }

    window.history.pushState("", "", newUrl);
  }

  readUrlParam(param) {
    if (this._bHash) {
      return this.readUrlParamFromSeg(param, window.location.hash);
    }
    const seg = window.location.href.replace(window.location.hash, '');
    return this.readUrlParamFromSeg(param, seg);
  }

  readUrlParams() {
    if (this._bHash) {
      return this.readUrlParamsFromSeg(window.location.hash);
    }
    const leftSeg = window.location.href.replace(window.location.hash, '');
    return this.readUrlParamsFromSeg(leftSeg);
  }

  readUrlParamsFromSeg(segment) {
    let outputObj = {};
    const regExp = new RegExp('\\?.*$');
    let paramsMatches = segment.match(regExp);
    if (paramsMatches && paramsMatches[0]) {
      let params = paramsMatches[0].replace(/\?/g, '');
      const paramsArray = params.split('&');
      outputObj = paramsArray.reduce((acc, cur) => {
        const key = cur.replace(/\=.*$/, '');
        if (key) {
          let val = cur.replace(/.*\=/, '');
          if (val !== undefined) {
            if (key !== undefined) {
              acc[key] = decodeURI(val);
            }
            return acc;
          }
        }
      }, {});
    }
    return outputObj;
  }

  readUrlParamFromSeg(param, seg) {
    let regExp = new RegExp(`\\?${param}=.*?\&|\\?${param}=.*$|\&${param}=.*?\&|\&${param}=.*$`);
    let matches = seg.match(regExp);
    if (matches && matches[0]) {
      regExp = new RegExp(`(\\?|\&)${param}=`);
      let val = matches[0].replace(regExp, '');
      val = val.replace(/\&/, '');
      if (val) {
        return decodeURI(val);
      }
    }
  }

  updateUrlHash(inputHashParam) {
    const hashParam = `#${inputHashParam}.${this.org_id}`;
    let newHash = hashParam;
    if (window.location.hash.match(new RegExp('#'))) {
      let regExp = new RegExp('\\?.*$');
      const hashParams = window.location.hash.match(regExp);
      if (hashParams && hashParams[0]) {
        newHash += hashParams;
      }
    }
    const newUrl = window.location.href.replace(new RegExp('#.*?$|$'), newHash);
    window.history.pushState("", "", newUrl);
    if (Stdlib.gaTrackingOn()) {
      let page = location.pathname + location.search + location.hash.split('.')[0];
      ReactGA.pageview(page);
    }
  }

  readUrlHash() {
    let retVal = '';
    const regExp = new RegExp('#.*\\?|#.*$');
    const matches = window.location.hash.match(regExp);
    if (matches && matches[0]) {
      const val = matches[0].replace(/#/g, '');
      retVal = val;
    }

    const leftRetVal = this.getLeftOfDotString(retVal);
    const orgId = this.getRightOfDotNumber(retVal, leftRetVal);
    if (orgId === 0 || this.org_id !== orgId) {
      this.updateUrlHash(this.defaultParam);
      return this.defaultParam;
    }
    return leftRetVal;
  }

  getLeftOfDotString(hash) {
    let retVal = '';
    const regExp = new RegExp('[^.]*');
    const matches = hash.match(regExp);
    if (matches && matches[0]) {
      retVal = matches[0];
    }

    return retVal;
  }

  getRightOfDotNumber(hash, left) {
    const regExp = new RegExp(`${left}.`);
    let val = hash.replace(regExp, '');
    val = val.replace(/\?/g, '');
    return parseInt(val ? val : 0);
  }

}
