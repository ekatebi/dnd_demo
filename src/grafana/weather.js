<style type="text/css">
p.markdown-html.panel-text-content {
  padding-top: 20px;
  overflow: hidden;
  border: blue solid 1px;
  }
p.markdown-html.panel-text-content iframe {
  height:225px;
  background-color: lightblue;
  border: red solid 1px;
  }
</style>
<script type="text/javascript">

function srcFunc() {


// walthham 42.393199 -71.25568

var weatherProperties = 'lat=42.393199&lon=-71.25568&color=#FFFFFF&text-color=#FFFFFF';

return 'https://forecast.io/embed/?ts=' + (Date.now()) + '#' + weatherProperties;
}

// initial load

var elem = document.getElementById('embedweather');

if (elem) {
  elem.src = srcFunc();
} else {
  console.log('elem not foumd');
}

// refresh
var weatherRefresh = setInterval(function() { 
  elem.src = srcFunc(); }, 1800000);

</script>

<iframe id="embedweather" height="100%" src="#" style="margin: 0; padding: 0; border: none; width:100%; position:relative; top:-50px; overflow:hidden; margin-bottom: -70px;"></iframe>
