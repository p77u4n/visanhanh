import ServiceDispatcher from './client.index.services.dispatcher';
import ServiceConstant from './client.index.services.constants';

let ServiceAction = {
    updateValidate(value){
        ServiceDispatcher.dispatch({
            type: ServiceConstant.UPDATE_VALIDATE,
            value : value 
        }); 
    } 
}
