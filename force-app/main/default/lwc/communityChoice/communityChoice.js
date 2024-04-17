import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import ursusResources from '@salesforce/resourceUrl/community_logo';
import getUserCommunities from '@salesforce/apex/CommunityController.getUserCommunities';
import searchCommunity from '@salesforce/apex/CommunityController.searchCommunity';
export default class CommunityChoice extends NavigationMixin(LightningElement) {
    searchTerm = '';
	@wire(searchCommunity, {searchTerm: '$searchTerm'})
    communities;
	connectedCallback() {
		localStorage.clear();
	  }
	
    
    
    handleSearchTermChange(event) {
		
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.communities.data.length > 0);
	}
    handleCommunityView(event) {
		// Get bear record id from bearview event
		// const communityId = event.detail;
		
		// Navigate to bear record page
		// this[NavigationMixin.Navigate]({
		// 	type: 'standard__recordPage',
		// 	attributes: {
		// 		recordId: communityId,
		// 		objectApiName: 'Network',
		// 		actionName: 'view',
		// 	},
		// });
		// this[NavigationMixin.Navigate]({
        //     type: "standard__component",
        //     attributes: {
        //         componentName: "userList"
        //     },
            
        // });
		const navConfig = {
          type: "standard__component",
          attributes: {
              componentName: "c__userListComp"
          },
          state: {
              c__param1: this.community.Id,
              c__param2: "Rijwan"
          }
      };
      this[NavigationMixin.Navigate](navConfig);


		

	}
    
	
}