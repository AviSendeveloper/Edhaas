const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const UserService = require("../Services/user.service");
const connectDb = require("../Config/Database");

const userNum = 50;
const roles = ["admin", "creator", "student", "parent"];
let parentIds = [];

const getAllParentIds = async () => await UserService.getAllParentIds();

const genrateUser = async () => {
    try {
        const role = roles[Math.floor(Math.random() * roles.length)];

        const hashPassword = await bcrypt.hash("123456", 5);

        const user = await UserService.createUser({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: hashPassword,
            role: role,
            parents: setParents(role),
            status: 1,
        });

        if (role === "parent") {
            parentIds.push(user._id);
        }
        console.log(`user_id: ${user._id} role: ${role}`);
    } catch (error) {
        console.log(`Errors: ${error}`);
    }
};

const setParents = (role) => {
    if (role !== "student") {
        return [];
    }

    if (parentIds.length == 0) {
        return [];
    }

    const maxParent = 2;
    const minParent = 0;
    const totalParent = Math.ceil(
        Math.random() * (maxParent - minParent) + minParent
    );
    const parents = [];

    for (let i = 0; i <= totalParent; i++) {
        parents.push({
            parentId: parentIds[Math.floor(Math.random() * parentIds.length)],
            joinedAt: faker.date.past(),
        });
    }

    return parents;
};

(async () => {
    await connectDb();
    parentIds = await getAllParentIds();
    for (let i = 0; i < userNum; i++) {
        await genrateUser();
    }
})();
