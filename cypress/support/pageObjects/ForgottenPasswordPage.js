import
{
    utils
}
from '../../support/Utilities/Utils';

class ForgottenPasswordPage
{
    emailField             = "//input[@name='email']";
    submitBtn              = "//button[@type='submit']";
    errorMessage           = "//p[contains(@class,'text-danger')]";
    helpIsOnTheWayMesssage = "//p[1]"
}

export const forgottenPasswordPage = new ForgottenPasswordPage();