#### How you would expand the above example into a working application.

To transform the script into a functional microservice, start by selecting a suitable web framework. ExpressJS is the most widely used but there are alternatives such as Koa and NestJS which offer different features depending on your requirements. Beyond RESTful services, GraphQL offers a flexible query language. 

Once a framework is chosen, define the necessary endpoints and ensure they return the correct payloads. 

For deployment, containerizing the application using Docker and hosting it on a cloud platform would be recommended.

#### What would your considerations be in regard to testing it?

If the application included a UI the I would recommend the Cypress framework. But for a microservice then tests written is Jest would be my recommendation. Testing should also be automatically triggered by your CI process.

#### How would you go about making deployments and releases?

Setting up a CI/CD pipeline streamlines deployments and releases. Platforms like GitHub Actions, GitLab CI/CD, and Jenkins offer robust automation tools. Typically, upon merging code to a release branch, the pipeline should initiate tests. Successful test completion can then activate automated build and deployment scripts.

#### Do you have any thoughts on how the API would be versioned and managed?

There are various approaches that can be taken for api versioning, there are a few factors that need to be considered when choosing an approach; who is the consumer of the api and how would they be impacted by breaking changes, how often is the api likely to change and will those changes be breaking and how strictly do you want to adhere to REST principals. URI Versioning is probably the most straightforward approach and is usually acceptable. 

#### Lastly any thoughts on non-functional requirements?

There are many non-functional requirements for a microservice Key considerations include: 

Security - Implement authentication and authorization mechanisms, and regularly patch vulnerabilities.

Reliability - Ensure the service has high availability and fault tolerance.

Performance - Monitor response times and optimize as necessary.

Scalability - Design the service to handle increased loads gracefully, considering both vertical and horizontal scaling.

Cost - Monitor cloud resource usage to optimize costs without compromising performance.
