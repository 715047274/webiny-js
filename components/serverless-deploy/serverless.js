const { Component } = require("@serverless/core");
const { green } = require("chalk");

const getAlias = inputs => {
    const type = inputs.apps ? "apps" : "api";
    return `${type}.${inputs.env}`;
};

class Deploy extends Component {
    async default(inputs = {}) {
        const alias = getAlias(inputs);

        const template = await this.load("@webiny/serverless-template", alias);
        const output = await template(inputs);

        if (inputs.api) {
            if (output.cdn) {
                console.log(`\n🚀 Your GraphQL API URL is ${green(output.cdn.url + "/graphql")}`);
            }
            if (output.cognito) {
                console.log(`🔒 Cognito UserPool ID: ${green(output.cognito.userPool.Id)}`);
                output.cognito.appClients.forEach(client => {
                    console.log(
                        `🔑 App Client ID [${client.ClientName}]: ${green(client.ClientId)}`
                    );
                });
            }
        }
    }

    async remove(inputs = {}) {
        const alias = getAlias(inputs);

        const template = await this.load("@webiny/serverless-template", alias);
        await template.remove(inputs);
    }
}

module.exports = Deploy;