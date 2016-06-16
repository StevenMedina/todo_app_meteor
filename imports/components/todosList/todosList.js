import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todosList.html';
import { Tasks } from '../../api/tasks.js';

class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      tasks() {
        return Tasks.find({}, {
            sort: {
              createdAt: -1
            }
        });
      }
    })
  }

  addTask(newTask) {
      Tasks.insert({
          text: newTask,
          createdAt: new Date
      });

      this.newTask = '';
  }

  setChecked(task) {
      Tasks.update(task._id, {
          $set: {
            checked: !task.checked
          },
      });
  }

  removeTask(task) {
      Tasks.remove(task._id);
  }
}

export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: TodosListCtrl
  });
