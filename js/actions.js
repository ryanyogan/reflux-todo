(function(Reflux, global) {

  global.TodoActions = Reflux.createActions([
    'toggleItem',
    'toggleAllItems',
    'addItem',
    'removeItem',
    'clearCompleted',
    'editItem'
  ]);
})(window.Reflux, window);
