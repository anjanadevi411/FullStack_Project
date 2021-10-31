import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const findOneByEmail = async (userEmail: string): Promise<UserDocument> => {
  const user = await User.findOne({ email: userEmail })
  if (!user) {
    // throw notfound error
    throw new NotFoundError(`User ${user} not found`)
  }
  return user
}

const findOrCreate = async (userProfile: UserDocument) => {
  //eslint-disable-next-line
  const { email, name, picture, given_name, family_name } = userProfile

  const user = await User.findOne({ email: email })
  console.log('user from services', user)
  if (!user) {
    const newUser = await new User({
      email,
      name,
      picture,
      givenName: given_name,
      familyName: family_name,
    }).save()
    return newUser
  } else {
    return user
  }
}

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().sort({ firstName: 1 })
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

//for testing purpose we are creating a user instead og google login
const createUser = async (userData: UserDocument) => {
  const createdUser = await userData.save()
  return createdUser
}

export default {
  findOneByEmail,
  findOrCreate,
  create,
  findById,
  findAll,
  update,
  deleteUser,
  createUser,
}
