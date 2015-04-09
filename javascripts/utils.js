var utils = {};

utils.ajax = function(o) {
  if(o.method === undefined || o.url === undefined || o.success === undefined) {
	console.log("ajax Exception");
  }
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
	if (req.readyState == 4) {
	  if (req.status == 200) {
		o.success(req);
	}
  };
  req.open(o.method, o.url, true);
  req.send();
}



