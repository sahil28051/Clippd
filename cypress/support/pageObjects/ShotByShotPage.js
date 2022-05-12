const shotQualityColumnLink = 'th:nth-child(12) button:nth-child(1)'
const shotQualitiesValue = "(//tbody[@role='rowgroup']/tr/td[12])"

class ShotByShotPage
{
    shotQualityColumnLink()
    {
        return cy.get(shotQualityColumnLink)
    }
    shotQualitiesFromTable()
    {
        return cy.xpath(shotQualitiesValue)
    }
}

export const shotByShotPage = new ShotByShotPage();
