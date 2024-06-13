document.getElementById('chatForm').addEventListener('submit', function(event) {
    var isValid = true;

    // Clear previous error messages and classes
    var fields = ['from', 'msg', 'to'];
    fields.forEach(function(field) {
        document.getElementById(field).classList.remove('is-invalid');
        document.getElementById(field).classList.remove('is-valid');
    });

    // Validate "from" field
    var from = document.getElementById('from').value;
    if (!from.trim()) {
        isValid = false;
        document.getElementById('from').classList.add('is-invalid');
    } else {
        document.getElementById('from').classList.add('is-valid');
    }

    // Validate "msg" field
    var msg = document.getElementById('msg').value;
    if (!msg.trim()) {
        isValid = false;
        document.getElementById('msg').classList.add('is-invalid');
    } else {
        document.getElementById('msg').classList.add('is-valid');
    }

    // Validate "to" field
    var to = document.getElementById('to').value;
    if (!to.trim()) {
        isValid = false;
        document.getElementById('to').classList.add('is-invalid');
    } else {
        document.getElementById('to').classList.add('is-valid');
    }

    // If any field is invalid, prevent form submission
    if (!isValid) {
        event.preventDefault();
    }
});
