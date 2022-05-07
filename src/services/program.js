import apolloClient from "../boot/apollo";
import {PROGRAMS_QUERY} from '../query/program';
const _getPrograms = async function(){
    try {
        const result = await apolloClient.query(PROGRAMS_QUERY);
        const data = result.data.programs.data;
        const programList = data.map(function(p){
            let program={};
            program.id = p.id;
            program.program_title=p.attributes.program_title
            program.program_description=p.attributes.program_description
            program.program_guidelines_1=p.attributes.program_guidelines_1
            program.program_guidelines_2=p.attributes.program_guidelines_2
            program.program_scope=p.attributes.program_scope
            program.legal_terms=p.attributes.legal_terms
            program.program_picture_url=p.attributes.program_picture_url
            program.is_closed=p.attributes.is_closed
            program.closed_at=p.attributes.closed_at
            program.createdAt=p.attributes.createdAt
            program.reward_guidelines=p.attributes.reward_guidelines

            
            program.program_type=p.attributes.program_type
            program.safe_harbour_type=p.attributes.safe_harbour_type
            program.reward_type = p.attributes.reward_type

            program.critical=p.attributes.reward_range.critical
            program.severe=p.attributes.reward_range.severe
            program.medium=p.attributes.reward_range.medium
            program.low=p.attributes.reward_range.low

            program.hackers=[]
            program.invitations=[]
            return program;
        })
        return Promise.resolve(programList);
    } catch (error) {
        return Promise.reject(0);
    }
}

export {
    _getPrograms
}