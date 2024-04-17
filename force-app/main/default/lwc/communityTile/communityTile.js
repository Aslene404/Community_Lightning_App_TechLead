import { LightningElement, api } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/community_logo';
import { NavigationMixin } from 'lightning/navigation';

export default class CommunityTile extends NavigationMixin(LightningElement) {
	@api community;
    // intitials=community.Name[0]+community.Name[1];
    // connectedCallback(){

	// 	console.log(this.community);
	
	//   }
	appResources = {
		communityLogo: `${ursusResources}/105-1052269_facebook-groups-facebook-groups-logo-png-transparent-png.png`,
	};
    // handleOpenRecordClick() {
    //     const selectEvent = new CustomEvent('communityview', {
    //         detail: this.community.Id
    //     });
    //     this.dispatchEvent(selectEvent);

    //     this[NavigationMixin.Navigate]({
    //         type: "standard__component",
    //         attributes: {
    //             componentName: "c__userList"
    //         },
    //         state: {
    //             communityId: this.community.Id
    //         }
    //     });
    //     const navConfig = {
    //         type: "standard__component",
    //         attributes: {
    //             componentName: "c__userListComp"
    //         },
    //         state: {
    //             c__param1: this.community.Id,
    //             c__param2: "Rijwan"
    //         }
    //     };
    //     this[NavigationMixin.Navigate](navConfig);



        
    //     }
    handleOpenRecordClick = (event) => {

        let communityid = this.community.Id;
        let communityname = this.community.Name;
        console.log(communityid);
        console.log(communityname);
        
        //set sessionStorage and localStorage values
        
        localStorage.setItem('communityid',communityid);
        localStorage.setItem('communityname',communityname);

        // Navigate to a specific CustomTab.
        // this[NavigationMixin.Navigate]({
        //     type: 'comm__namedPage',
        //     attributes: {
        //         name: 'userList'
        //     }
        // });

        let domain = window.location.origin;
        window.open(domain+'/c/mainscreenApp.app',"_self");
    }
    }