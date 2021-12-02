import * as Types from './SubModule';

@Contract
export class Minimal {
    storage: Types.TStorage = {
        value: 1,
    };

    @EntryPoint
    ep(value: TNat): void {
        this.storage.value = value;
    }
}

Dev.test({ name: 'Minimal' }, () => {
    Scenario.h1('Originating Contract');
    const c1 = Scenario.originate(new Minimal());

    Scenario.p('Initial value must be 1.');
    Scenario.verify(c1.storage.value == 1);

    Scenario.h2('Calling entry point (ep) with value 10.');
    Scenario.transfer(c1.ep(10));

    Scenario.p('Final value must be 10.');
    Scenario.verify(c1.storage.value == 10);
});

Dev.compileContract('minimal', new Minimal());
