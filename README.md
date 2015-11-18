# Meteor Vericall

This package provides a wrap up of Vericall APIs for Meteor.

### Install

    meteor add jwall149:meteor-vericall`

Add environment variable `VERICALL_APIKEY` to your vericall API key.

    export VERICALL_APIKEY=your_vericall_org_apikey

### Using synchronously call

#### Create a miss call from server

    Vericall.missCall('+123456789')

Result when success

    {
      status: true,
      message: 'Call request has been processed',
      request_id: 'alskdfjalskdfj'
    }

When fail

    {status: false, message: 'Vericall Connection Error'}
    {status:false, message: 'Invalid API Key'}
    {status: false, message: 'Could not process call request'}

#### Verify a misscall

    Vericall.verify('alskdfjalskdfj', '0000')

Result when success

    {
      status: true,
      message: 'Request ID and From Number are correct'
    }

When fail

    {status: false, message: 'Invalid Request ID and From Number or API Key combination'}
    {status: false, message: 'Invalid API Key'}

## Using asynchronously

    Vericall.missCall('+123456789', function(err, res){
      if (err) return console.log(err);
      console.log(res.status, res.message, res.request_id);
    })

    Vericall.verify('asaskdfaksdj', '7777', function(err, res){
      if (err) return console.log(err);
      console.log(res.status);
    })
