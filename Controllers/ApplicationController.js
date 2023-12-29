exports.getBanner = (req, res) => {
    const bannerImgArr = [
        "https://img.freepik.com/free-vector/education-horizontal-typography-banner-set-with-learning-knowledge-symbols-flat-illustration_1284-29493.jpg",
        "https://static.vecteezy.com/system/resources/thumbnails/002/294/868/small/digital-learning-web-banner-design-students-study-with-mobile-phone-during-online-class-online-education-digital-classroom-e-learning-concept-header-or-footer-banner-free-vector.jpg",
        "https://img.freepik.com/free-psd/education-horizontal-banner-template_23-2148941824.jpg",
    ];

    return res.json({
        status: true,
        banner: bannerImgArr,
    });
};
