import { LightningElement, wire, track } from 'lwc';
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import UserNameFIELD from '@salesforce/schema/User.Name';
import userEmailFIELD from '@salesforce/schema/User.Email';
import userIsActiveFIELD from '@salesforce/schema/User.IsActive';
import userAliasFIELD from '@salesforce/schema/User.Alias';
import ursusResources from '@salesforce/resourceUrl/community_logo';


export default class Navbar extends LightningElement {
    @track localStorageCommunityName = localStorage.getItem('communityname');
    @track displayuser;
    @track error;
    @track userId = Id;
    @track currentUserName;
    @track currentUserEmail;
    @track currentIsActive;
    @track currentUserAlias;
 
    @wire(getRecord, { recordId: Id, fields: [UserNameFIELD, userEmailFIELD, userIsActiveFIELD, userAliasFIELD ]}) 
    currentUserInfo({error, data}) {
        if (data) {
            this.displayuser=true;
            this.currentUserName = data.fields.Name.value;
            this.currentUserEmail = data.fields.Email.value;
            this.currentIsActive = data.fields.IsActive.value;
            this.currentUserAlias = data.fields.Alias.value;
        } else if (error) {
            this.error = error ;
        }
    }
    
    appResources = {
		appLogo: `${ursusResources}/app_logo.png`,
	};
    handlelogoclick = (event) => {

        

        let domain = window.location.origin;
        window.open(domain+'/c/communityApp.app',"_self");
        localStorage.clear();
    }
    handleMenuItemSelect(event) {
        // handle the menu item selection
        const selectedMenuItemValue = event.detail.value;
        console.log('Selected Menu Item:', selectedMenuItemValue);
    }
}