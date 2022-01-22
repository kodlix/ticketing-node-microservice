import mongoose, { Mongoose } from 'mongoose';
import { Password } from '../services/password';

//An interface that describes the properties
//required to create a new user
interface IUserAttrs {
    email: string;
    password: string;
};

//An interface that describes the properties
//that a User Model has
interface IUserModel extends mongoose.Model<IUserDoc> {
   build(attrs: IUserAttrs): IUserDoc;
};

//An interface that describes the properties
//a User Document has
interface IUserDoc extends mongoose.Document {
    email: string;
    password: string;
};

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
        }
    }
})

UserSchema.pre('save',async function (done) {
   if (this.isModified('password')) {
       const hashed = await Password.toHash(this.get('password'));
       this.set('password', hashed);
   }
   done();
});

UserSchema.statics.build = (attrs: IUserAttrs) =>{
    return new User(attrs);
}

const User = mongoose.model<IUserDoc, IUserModel>('User', UserSchema);

export { User };