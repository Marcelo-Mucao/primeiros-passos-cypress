import userData from '../fixtures/user-data.json'
import LoginPage from '../pages/loginPage.js'

const loginPage = new LoginPage()

describe('Orange HRM Tests', () => {
  
  const selectorsList = {    
    sectionTitleTopBar: ".oxd-topbar-header-breadcrumb-module",
    dashboardGrid: ".orangehrm-dashboard-grid",    
    myInfoButton: "[href='/web/index.php/pim/viewMyDetails']",
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateField: "[placeholder='yyyy-dd-mm']",
    genericCombobox:".oxd-select-text--arrow",
    secondItemCombobox:".oxd-select-dropdown > :nth-child(3)",
    ThirdItemCombobox:".oxd-select-dropdown > :nth-child(2)",
    dateCloseButton: ".--close",
    submitButton: "[type='submit']",

  }
    
  it.only('User Info Update - Success', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithUser(userData.userSucces.username,userData.userSucces.password)
    
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid)
    cy.get(selectorsList.myInfoButton).click()
    cy.get(selectorsList.firstNameField).clear().type("FirstNameTest")
    cy.get(selectorsList.lastNameField).clear().type("LastNameTest")
    cy.get(selectorsList.genericField).eq(3).clear().type("Employee")
    cy.get(selectorsList.genericField).eq(4).clear().type("otherIdTeste")
    cy.get(selectorsList.genericField).eq(5).clear().type("DriversLicenseTeste")
    cy.get(selectorsList.genericField).eq(6).clear().type("2025-03-10")
    cy.get(selectorsList.dateCloseButton).click()
    cy.get(selectorsList.submitButton).eq(0).click({force:true})
    cy.get("body").should("contain", "Successfully Updated")
    cy.get('.oxd-toast-close')
    cy.get(selectorsList.genericCombobox).eq(0).click()
    cy.get(selectorsList.secondItemCombobox).click()
    cy.get(selectorsList.genericCombobox).eq(1).click()
    cy.get(selectorsList.ThirdItemCombobox).click()

   })
  it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })
})