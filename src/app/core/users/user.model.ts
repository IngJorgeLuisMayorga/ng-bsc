export type User = {

   id: number;
   name: string;
   first_name?: string;
   last_name?: string;

   email: string;

   nid_type: string;
   nid_number: string;
   nid?: string;
   
   birthdate: Date;
   points?: number;
   photo: string;

   phone: string;
   city: string;
   address: string;

   cart?: any[];
   whislist?: any[];
   orders?: any[];

   signin_at: Date;
   password?: string;
   
   created_at: Date;
   updated_at: Date;

   comments?: string;

}