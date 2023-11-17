/**
 * GET/ 
 * homepage
 */

exports.homePage = async(req,res)=>{
    const locals = {
        title: "Snap Thoughts",
        description: "Express your thought just for free"
    }
    res.render('index', {
    locals,
    layout: '../views/layouts/front-page'
});
}
/**
 * GET/ 
 * about
 */
exports.about = async(req,res)=>{
    const locals = {
        title: "About Snap Thoughts",
        description: "Express your thought just for free"
    }
    res.render('about',locals);
}