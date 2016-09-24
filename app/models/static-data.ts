import {NamedGroup} from './named-group'
import {Person} from './person'
import {Office} from './office'

export class StaticData {
    constructor(
        public officeGroups: NamedGroup<Office>[],
        public personGroups: NamedGroup<Person>[]
    ){}
}