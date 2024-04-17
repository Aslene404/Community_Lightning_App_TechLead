import { LightningElement, track, wire,api } from 'lwc';
import getCommunityUsers from '@salesforce/apex/CommunityUsersController.getCommunityUsers';
import searchUsers from '@salesforce/apex/CommunityUsersController.searchUsers';

const actions = [
  { label: 'Show details', name: 'show_details' }
  
];
const columns = [
  { label: 'User Name', fieldName: 'MemberUserName', type: 'text' },
  { label: 'Name', fieldName: 'MemberName', type: 'text' },
  { label: 'Email', fieldName: 'MemberEmail', type: 'email' },
  { label: 'Profile', fieldName: 'MemberProfile', type: 'text' },
  { label: 'License', fieldName: 'MemberLicense', type: 'text' },
  {
    type: 'action',
    typeAttributes: { rowActions: actions },
}
];
export default class UserList extends LightningElement {
   recordId;
    localStorageCommunityId=localStorage.getItem('communityid');
    localStorageCommunityName;
    columns = columns;
    searchTerm = '';
    
      record = {};
      handleSearchTermChange(event) {
		
        window.clearTimeout(this.delayTimeout);
        const searchTerm = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
          this.searchTerm = searchTerm;
        }, 300);
      }
      get hasResults() {
        return (this.members.data.length > 0);
      }
      
      
      members;

    @wire(searchUsers, {searchTerm: '$searchTerm',communityid: '$localStorageCommunityId'})
    wiredAccounts({ data, error }) {
        if (data) {
            this.members = data;
            console.log(JSON.parse(JSON.stringify(data)));
            this.members = data.map((net) => {
              const netWithMember = {...net}; // clone the original record
              netWithMember.MemberName = net.Member.Name; // add the new property
              netWithMember.MemberUserName = net.Member.Username; 
              netWithMember.MemberEmail = net.Member.Email; 
              netWithMember.MemberProfile = net.Member.Profile.Name;
              netWithMember.MemberLicense = net.Member.Profile.UserLicense.Name;
              return netWithMember;
          });
        } else if (error) {
            console.error(error);
        }
    }
    
      


    connectedCallback() {
      // console.log(JSON.parse(JSON.stringify(this.members.data)));
        console.log(this.localStorageCommunityId);

        if(localStorage.getItem('communityid')){
            //An Id key is in the local Storage
            this.localStorageCommunityId = localStorage.getItem('communityid');

            
        }
        if(localStorage.getItem('communityname')){
            //An Id key is in the local Storage
            // this.localStorageCommunityName = localStorage.getItem('communityname');
            // this.localStorageCommunityName= "User List for "+this.localStorageCommunityName;
            // console.log(this.localStorageCommunityName);

            
        }
        //Clear local storage after getting the values
        // localStorage.clear();
    }
    handleRowAction(event) {
      const actionName = event.detail.action.name;
      const row = event.detail.row;
      switch (actionName) {
          case 'show_details':
              this.showRowDetails(row);
              break;
          default:
      }
  }
  findRowIndexById(id) {
    let ret = -1;
    this.members.some((row, index) => {
        if (row.id === id) {
            ret = index;
            return true;
        }
        return false;
    });
    return ret;
}

showRowDetails(row) {
    this.record = row;

}
    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        console.log(selectedRows);
        // Handle selected rows here
      }
      handleTabChange(event) {
        const selectedTabValue = event.detail.value;
        // Handle tab change here
      }
    
}