/**
 * To run in BAS
 * cf create-service-key <yourDestinationService> <yourDestinationServiceKey>
 * cds bind destination --to <yourDestinationService>:<yourDestinationServiceKey>
 * 
 * cf create-service-key <yourAppsXsuaaService> <yourAppsXsuaaServiceServiceKey>
 * cds bind uaa --to <yourAppsXsuaaService>:<yourAppsXsuaaServiceServiceKey> --kind xsuaa --profile hybrid
 * 
 * cds watch --profile hybrid
 * 
 * Example:
 * cf create-service-key testxsuaaapi-destination-service xsuaa-dest-service-key
 * cds bind destination --to testxsuaaapi-destination-service:xsuaa-dest-service-key
 * 
 * cf create-service-key testxsuaaapi-xsuaa-app-service xsuaa-app-service-key
 * cds bind uaa --to testxsuaaapi-xsuaa-app-service:xsuaa-app-service-key --kind xsuaa --profile hybrid
 * 
 * cds watch --profile hybrid
 */
const cds = require("@sap/cds");
/**
 *
 * The service implementation with all service handlers
 */

module.exports = cds.service.impl(async function () {

  const xsuaaSrv = await cds.connect.to("testcap-dest");

  /**
   * Sample URI
   * http://localhost:4004/service/api/getUserList()
   */
  this.on('getUserList', async (req) => {

    let
      apiResponse = await xsuaaSrv.tx(req).get("/Users"),
      aResponse = [];

    apiResponse.resources.forEach(resource => {

      aResponse.push({
        id: resource.id,
        externalId: resource.externalId,
        userName: resource.userName,
        familyName: resource.name.familyName,
        givenName: resource.name.givenName,
        roleCollections: resource.groups.map(group => group.value)
      });

    });

    return aResponse;

  });


  this.on('getUserListLess', async (req) => {

    let apiResponse = await xsuaaSrv.tx(req).get("/Users");
    return apiResponse.resources;

  });


  /**
   * Sample URI:
   * http://localhost:4004/service/api/getUserInfo(userName='mvillanuev29@dxc.com')
   */
  this.on('getUserInfo', async (req) => {

    let
      apiResponse = await xsuaaSrv.tx(req).get(`/Users?filter=userName eq '${req.data.userName}'`),
      resource = apiResponse.resources[0];

    return {
      id: resource.id,
      externalId: resource.externalId,
      userName: resource.userName,
      familyName: resource.name.familyName,
      givenName: resource.name.givenName,
      roleCollections: resource.groups.map(group => group.value)
    }

  });


  this.on('ping', async (req) => {
    return 'Ping';
  });

});