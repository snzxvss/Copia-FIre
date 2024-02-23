import db from "../connection";
import { Organization } from '../../interfaces/organization_interface';

export class OrganizationDbProcedures {
    private db: typeof db;

    constructor() {
        this.db = db;
    }

    public async getOrganizationInfo(): Promise<Organization> {
        const [organization] = await this.db.query('call GetOrganizationInfo()'
        ) as { organization_info: Organization }[];

        return organization.organization_info;
    }
    //TODO =================================<ARREGLAR>=================================
    public async updateOrganizationInfo(newOrganizationData: object): Promise<string> {
        const [response] = await this.db.query('call UpdateOrganization(:newOrganizationData)', {
            replacements: {
                newOrganizationData: JSON.stringify(newOrganizationData) || JSON.stringify({})
            }
        }) as { response: string }[];

        return response.response;
    }

}