interface ICreateContactDTO {
  user_id: string
  first_name: string
  last_name: string
  phone_number: string
  address: string
  created_at?: string
}

export { ICreateContactDTO }
