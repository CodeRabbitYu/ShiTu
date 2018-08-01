/**
 * @flow
 * Created by Rabbit on 2018/7/23.
 */
import {observable, computed, action, runInAction, autorun} from 'mobx';

class Test {

	@observable title;

	@action.bound
	setTitle(title: string) {
		this.title = title;
		// return title;
	}

}

export {Test};