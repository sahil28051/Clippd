const type = "//div[@class='inline-block text-center']/h4"
const title = "(//div[@class='inline-block text-center']/../../div)[2]/div/div/h2"
const desc = "((//div[@class='inline-block text-center']/../../div)[2]/div/div/p)[1]"
const notes = "((//div[@class='inline-block text-center']/../../div)[2]/div/div/p)[2]"
const location = "//span[@class='text-xl font-medium']"
const date = "//*[text()='Date']/.."
const time = "//*[text()='Time']/.."
const duration = "//*[text()='Duration']/.."
const editBtn = "(//button)[8]"
const editModelLabel = '#create-activity-heading'
const deleteBtn = "//button[normalize-space()='Delete']"
const yesDeleteBtn = "//button[normalize-space()='Yes, delete']"

class Off_CoursePage {
    activityType() {
        return cy.xpath(type)
    }
    activityTitle(){
        return cy.xpath(title)
    }
    activityDesc(){
        return cy.xpath(desc)
    }
    activityNotes(){
        return cy.xpath(notes)
    }
    activityLocation(){
        return cy.xpath(location)
    }
    activityDate(){
        return cy.xpath(date)
    }
    activityTime(){
        return cy.xpath(time)
    }
    activityDuration(){
        return cy.xpath(duration)
    }
    editBtn(){
        return cy.xpath(editBtn)
    }
    editModelLabel(){
        return cy.get(editModelLabel)
    }
    deleteBtn(){
        return cy.xpath(deleteBtn)
    }
    yesDeleteBtn(){
        return cy.xpath(yesDeleteBtn)
    }
}
export const offCoursePage = new Off_CoursePage()