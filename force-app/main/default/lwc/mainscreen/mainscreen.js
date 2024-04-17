import { LightningElement } from 'lwc';

export default class Mainscreen extends LightningElement {
    
    handleTabChange(event) {
        const selectedTabValue = event.detail.value;
        // Handle tab change here
      }
      handleBackClick(event){
        let domain = window.location.origin;
        window.open(domain+'/c/communityApp.app',"_self");
        localStorage.clear();

      }
}