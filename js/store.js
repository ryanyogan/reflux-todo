(function(Reflux, TodoActions, global) {
  'use strict';

  var todoCounter = 0,
      localStorageKey = 'todos';

  function getItemByKey(list, itemKey) {
    return _.find(list, function(item) {
      return item.key === itemKey;
    });
  }

  global.todoListStoe = Reflux.createStore({
    listenables: [TodoActions],

    onEditItem: function(itemKey, newLabel) {
      var foundItem = getItemByKey(this.list, itemKey);
      if (!foundItem) {
        return;
      }
      foundItem.label = newLabel;
      this.updateList(this.list);
    },

    onAddItem: function(label) {
      this.updateList([{
        key: todoCounter++,
        created: new Date(),
        isComplete: false,
        label: label
      }].concat(this.list));
    },

    onRemoveItem: function(itemKey) {
      this.updateList(_.filter(this.list, function(item) {
        return item.key !== itemKey;
      }));
    },

    onToggleItem: function(itemKey) {
      var foundItem = getItemByKey(this.list, itemKey);
      if (foundItem) {
        foundItem.isComplete = !foundItem.isComplete;
        this.updateList(this.list);
      }
    },

    onToggleAllItems: function(checked) {
      this.updateList(_.map(this.list, function(item) {
        item.isComplete = checked;
        return item;
      }));
    },

    onClearCompleted: function() {
      this.updateList(_.filter(this.list, function(item) {
        return !item.isComplete;
      }));
    },

    updateList: function(list) {
      localStorage.setItem(localStorageKey, JSON.stringify(list));

      this.list = list;
      this.trigger(list);
    },

    getInitialState: function() {
      var loadedList = localStorage.getItem(localStorageKey);
      if (!loadedList) {
        this.list = [{
          key: todoCounter++,
          created: new Date(),
          isComplete: false,
          label: 'Rule the web'
        }];
      } else {
        this.list = _.map(JSON.parse(loadedList), function(item) {
          item.key = todoCounter++;
          return item;
        });
      }
      return this.list;
    }
  });
})(window.Reflux, window.TodoActions, window);
