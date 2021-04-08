// interface token {}

interface IAuthentication {
  generate(user_id: string): Promise<string>
}

export { IAuthentication }
