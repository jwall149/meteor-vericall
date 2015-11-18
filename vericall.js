Vericall = (function() {
  var apikey, missCall, vericallApiCall, verify;

  apikey = process.env.VERICALL_APIKEY;
  if (!apikey) console.log('Can not find VERICALL_APIKEY');

  vericallApiCall = function(url, data, cb) {
    if (!(url && data)) return false;

    var callParams = {
      params: data,
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
    };
    callParams.params.api_key = apikey;

    try {
      if (typeof cb === 'function') {
        return HTTP.post(url, callParams, function(err, res) {
          var jres;
          if (err) return cb(err);
          jres = JSON.parse(res.content);
          if (!jres.status) return cb(new Meteor.Error(404, jres.message));
          return cb(null, jres);
        });
      } else {
        res = HTTP.post(url, callParams);
        return JSON.parse(res.content);
      }
    } catch (error) {
      if (typeof cb === 'function') return cb(new Meteor.Error(400, 'vericall_connection'));
      return {status: false, message: 'Vericall Connection Error'};
    }
  };
  missCall = function(to_number, cb) {
    if (!to_number) return false;
    return vericallApiCall("http://api.vericall.org/api/call_request", {
      to_number: to_number
    }, cb);
  };
  verify = function(request_id, token, cb) {
    if (!(request_id && token)) return false;
    return vericallApiCall("http://api.vericall.org/api/verify", {
      from_number: token,
      request_id: request_id
    }, cb);
  };
  return {
    missCall: missCall,
    verify: verify
  };
})();
