/// <reference types="Cypress"/>
Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

describe('Got api test', () => {
 
    it('Sucesso', () => {
        cy.request({
            method: "GET",
            url:    "https://anapioficeandfire.com/api/houses/",
            Body: {

        "name": "",
        "region": "",
        "coatOfArms": "",
        "words": "",
        "titles": [
            ""
        ],
        "seats": [
            ""
        ],
        "currentLord": "",
        "heir": "",
        "overlord": "",
        "founded": "",
        "founder": "",
        "diedOut": "",
        "ancestralWeapons": [
            ""
        ],
        "cadetBranches": [],
        "swornMembers": [
            ""
        ]
        
    },
        
    
    })
    
})

})