


const getHomepage = (req, res) => {
    const userId = req.session.user ? req.session.user.userId : null;

    return res.render('home', { userId })
}

const getLoginForm = (req, res) => {
    return res.render('login.ejs')
}

const getRegisterForm = (req, res) => {
    return res.render('register.ejs')
}

const getHomepageUser = (req, res) => {
    return res.render('user.ejs')
}
const getDoctorHome = (req,res) => {
    return res.render('doctorHome.ejs')
}




module.exports = { getDoctorHome,getHomepage, getLoginForm, getRegisterForm,getHomepageUser}