const { faker } = require("@faker-js/faker");
const UserService = require("../Services/user.service");
const connectDb = require("../Config/Database");

const userNum = 50;
const parentIds = [];
const roles = ["admin", "creator", "student", "parent"];

const genrateUser = async () => {
    try {
        console.log("=========================");
        const role = roles[Math.floor(Math.random() * roles.length)];

        const user = await UserService.createUser({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: "123456",
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

    for (let i = i; i <= totalParent; i++) {
        parents.push({
            parentId: parentIds[Math.floor(Math.random() * parentIds.length)],
            joinedAt: faker.date.past(),
        });
    }

    return parents;
};

(async () => {
    await connectDb();
    for (let i = 0; i < userNum; i++) {
        await genrateUser();
    }
    console.log("parentIds: ", parentIds);
})();
