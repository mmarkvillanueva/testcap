@path: 'service/api'

service XsuaaService {

    type userInfo {
        id              : String;
        externalId      : String;
        userName        : String;
        familyName      : String;
        givenName       : String;
        roleCollections : array of String;
    }

    function getUserList()                  returns array of userInfo;

    function getUserListLess()              returns array of {
        userName : String;
        externalId : String;
    };

    function getUserInfo(userName : String) returns userInfo;
    function ping()                         returns String;

}
