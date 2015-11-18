Vericall = (() ->
  apikey = process.env.VERICALL_APIKEY
  console.log 'Can not find VERICALL_APIKEY' unless apikey

  vericallApiCall = (url, data, cb) ->
    return false unless url && data
    callParams = {params: data, headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    callParams.params.api_key = apikey
    try
      if typeof cb == 'function'
        HTTP.post url, callParams, (err, res) ->
          return cb(err) if err
          jres = JSON.parse res.content
          return cb(new Meteor.Error 404, jres.message) unless jres.status
          cb(null, jres)
      else
        res = HTTP.post url, callParams
        JSON.parse res.content
    catch
      return cb(new Meteor.Error 400, 'vericall_connection') if typeof cb == 'function'
      {status: false, message: 'Vericall Connection Error'}

  missCall = (to_number, cb) ->
    return false unless to_number
    vericallApiCall "http://api.vericall.org/api/call_request", {to_number: to_number}, cb

  verify = (request_id, token, cb) ->
    return false unless request_id && token
    vericallApiCall "http://api.vericall.org/api/verify", {from_number: token, request_id: request_id}, cb

  {missCall: missCall, verify: verify}
)()