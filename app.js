const adb = require('adbkit')
const execSync = require('child_process').execSync;
const client = adb.createClient();

function restart () {
  client.trackDevices()
    .then(function(tracker) {
      tracker.on('add', function(device) {
        console.log('Device %s was plugged in', device.id);
        console.log('Execute adb reverse command');
        execSync('adb reverse tcp:8081 tcp:8081');
      });

      tracker.reader.catch(err => {
        tracker.end();
        setTimeout(restart, 1000);
      });
    })
    .catch(function(err) {
      console.error('Something went wrong:', err.stack);
    });
}

restart();
