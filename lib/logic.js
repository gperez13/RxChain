/**
*This is the set up for the Demo. It will create initial participants and assets
* @param {org.rxchain.OurSetupDemo} ourSetupDemo
@transaction
**/


function ourSetupDemo (ourSetupDemo){

    var factory = getFactory();
    var NS = 'org.rxchain';

    // create the Patient

    var patient = factory.newResource(NS, 'Patient', '1234567');
    var patientAddress = factory.newConcept(NS, 'Address');
    patientAddress.country = 'USA';
    patient.address = patientAddress;
    patient.accountBalance = 0;


    //create the Physician
    var physician = factory.newResource(NS, 'Physician', '12345 ');
    physician.name = 'Patch Adams'
    physician.accountBalance = 1000000;

    //create the Vendor
    var vendor = factory.newResource(NS, 'Vendor', 'vendor@gmail.com');
    vendor.accountBalance = 1000000;

    //create the Recipe
    var recipe = factory.newResource(NS, 'Recipe', 'RCP_001');
    recipe.patient = factory.newRelationship(NS, 'Patient', '1234567');
    recipe.physician = factory.newRelationship(NS, 'Physician', '12345');
    var time = ourSetupDemo.timestamp;
    time.setDate(time.getDate());
    recipe.prescriptionDate = time;
    recipe.amount = 100


    //create the Shipment

    var shipment = factory.newResource(NS, 'Shipment', 'SHP_001');
    shipment.type = 'ASPIRIN';
    shipment.status = 'PRESCRIBED';
    shipment.unitCount = '10';
    shipment.recipe = factory.newRelationship(NS, 'Recipe', 'RCP_001');


    //Javascript promises

    return getParticipantRegistry(NS + '.Patient')
        .then(function(patientRegistry){
            return patientRegistry.addAll([patient]);
        })
        .then(function(){
            return getParticipantRegistry(NS + '.Physician')
        })
        .then(function(physicianRegistry){
          return physicianRegistry.addAll([physician]);  
        })
        .then(function(){
            return getParticipantRegistry(NS + '.Vendor')
        })
        .then(function(vendorRegistry){
          return vendorRegistry.addAll([vendor]);  
        })
        .then(function(){
            return getAssetRegistry(NS + '.Recipe')
        })
        .then(function(recipeRegistry){
            return recipeRegistry.addAll([recipe])
        })
        .then(function(){
            return getAssetRegistry(NS + '.Shipment')
        })
        .then(function(shipmentRegistry){
            return shipmentRegistry.addAll([shipment])
        })
}





/**
* Physicians need to create orders to prescribe
* @param {org.rxchain.ShipmentReceived} shipmentReceived
* @transaction
*/
















