export default {
  Query: {
    user: (root, data, { mongo: { User } }) => {
      return new Promise((resolve, reject) => {
        User.findOne(data).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    users: (root, _, { mongo: { User } }) => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  Mutation: {
    addUser: (root, { id, name, email }, { mongo: { User } }) => {
      const newUser = new User({ name, email });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    editUser: (root, { id, ...rest }, { mongo: { User } }) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: id }, { $set: rest }).exec((err, res) => {
          err
            ? reject(err)
            : resolve(
                new Promise((resolve, reject) => {
                  User.findOne({ _id: id }).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                  });
                })
              );
        });
      });
    },
    deleteUser: (root, { id }, { mongo: { User } }) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove({ _id: id }).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
