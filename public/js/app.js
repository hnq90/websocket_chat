// Generated by CoffeeScript 1.6.3
(function() {
  jQuery(function() {
    var ws;
    $.fn.editable.defaults.mode = 'inline';
    $('textarea').emojiarea({
      buttonLabel: '插入表情',
      buttonPosition: 'before'
    });
    $('#username').editable({
      type: 'text',
      pk: 1,
      url: '/username',
      title: 'Enter username'
    });
    $('#username').on('save', function(e, params) {
      return location.reload();
    });
    ws = new WebSocket("ws://0.0.0.0:8080");
    ws.onmessage = function(evt) {
      $('#chat tbody').append('<tr><td>' + evt.data + '</td></tr>');
      if ($('form').hasClass('notconnected')) {
        $('form').removeClass('notconnected');
        $('.emoji-wysiwyg-editor').empty().attr('contenteditable', true);
      }
      return $('.msg').scrollTop(900000);
    };
    ws.onclose = function() {
      return ws.send("Leaves the chat");
    };
    ws.onopen = function() {
      return ws.send("Join the chat");
    };
    $("#send").click(function(e) {
      if ($('form').hasClass('notconnected')) {
        return false;
      }
      if ($("#msg").val().length > 0) {
        ws.send($(".emoji-wysiwyg-editor").html());
        $(".emoji-wysiwyg-editor").empty();
      }
      return false;
    });
    $(document).live('keydown', function(e) {
      if (e.ctrlKey && e.keyCode === 13) {
        return $('#send').trigger('click');
      }
    });
    return $("#clear").click(function() {
      return $('#chat tbody tr').remove();
    });
  });

}).call(this);
