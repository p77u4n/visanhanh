import {Dispatcher} from 'flux';

class ServiceDispatcher extends Dispatcher {
    dispatch(action = {}) {
        console.log("Dispatched", action);
        super.dispatch(action); 
    }
}
