public with sharing class CommunityController {
    @AuraEnabled(cacheable=true scope='global')
    public static Network[] getUserCommunities() {
        return [
            SELECT
                Id,
                Name,
                Description,
                LastModifiedDate,
                CreatedDate

            FROM Network
            WHERE CreatedById IN
            (SELECT Id
             From User
             WHERE username=:UserInfo.getUsername())
            WITH SECURITY_ENFORCED
            ORDER BY LastModifiedDate
            
        ];
    }
    @AuraEnabled(cacheable=true scope='global')
    public static Network[] searchCommunity(String searchTerm) {
        // Return all bears when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getUserCommunities();
        }
        // Prepare query paramters
        // searchTerm = '%' + searchTerm + '%';
        // Execute search query
        // return [
        //     SELECT
        //     Id,
        //     Name,
        //     Description,
        //     LastModifiedDate,
        //     CreatedDate
        //     FROM Network
        //     WHERE Name LIKE :searchTerm AND CreatedById IN
        //     (SELECT Id
        //      From User
        //      WHERE username=:UserInfo.getUsername())
        //     WITH SECURITY_ENFORCED
        //     ORDER BY LastModifiedDate
            
        // ];
        List<Network> communities=getUserCommunities();
        List<Network> filteredcommunities=new List<Network>();
        for( Network comm : communities){
            if (comm.Name.toUpperCase().contains(searchTerm.toUpperCase())) {
                filteredcommunities.add(comm);
                
            }
        }
        return filteredcommunities;
    }
    public CommunityController() {
        

    }
}