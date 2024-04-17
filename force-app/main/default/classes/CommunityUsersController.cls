public with sharing class CommunityUsersController {
    @AuraEnabled(cacheable=true scope='global')
    public static NetworkMember[] getCommunityUsers(String communityid) {
        return [
            SELECT
                Member.Username,
                Member.Name,
                Member.Email,
                Member.Profile.Name,
                Member.Profile.UserLicense.Name

            FROM NetworkMember
            WHERE NetworkId=:communityid
            
            
        ];
    }
    @AuraEnabled(cacheable=true scope='global')
    public static NetworkMember[] searchUsers(String searchTerm,String communityid) {
        
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getCommunityUsers(communityid);
        }
        
        List<NetworkMember> members=getCommunityUsers(communityid);
        List<NetworkMember> filteredmembers=new List<NetworkMember>();
        for( NetworkMember member : members){
            if (member.Member.Name.toUpperCase().contains(searchTerm.toUpperCase()) 
            || member.Member.UserName.toUpperCase().contains(searchTerm.toUpperCase())
            || member.Member.Email.toUpperCase().contains(searchTerm.toUpperCase())
            || member.Member.Profile.Name.toUpperCase().contains(searchTerm.toUpperCase()) 
            || member.Member.Profile.UserLicense.Name.toUpperCase().contains(searchTerm.toUpperCase())) {
                filteredmembers.add(member);
                
            }
        }
        return filteredmembers;
    }
    
    public CommunityUsersController() {

    }
}