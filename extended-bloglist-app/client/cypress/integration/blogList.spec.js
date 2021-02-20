describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Chiranjibi",
      username: "Chiranjibi",
      password: "Chiranjibi",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  describe("Login from shown", function () {
    beforeEach(function () {
      cy.contains("login").click();
    });
    it("Login form is shown", function () {
      cy.contains("username");
      cy.contains("Password");
    });
  });

  describe("Login-frontend", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("Chiranjibi");
      cy.get("#password").type("Chiranjibi");
      cy.get("#login").click();

      cy.contains("Chiranjibi");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("Chiranjibi");
      cy.get("#password").type("wrong");
      cy.get("#login").click();

      cy.contains("wrong Username or Password");
      cy.get(".error").should("contain", "wrong Username or Password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe.only("When logged in..", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("Chiranjibi");
      cy.get("#password").type("Chiranjibi");
      cy.get("#login").click();
    });

    it("a blog can be created", function () {
      cy.contains("Create new blog").click();
      cy.get("#title").type("test cypress");
      cy.get("#author").type("Chiranjibi");
      cy.get("#url").type("www.testcypress.com");
      cy.get("#create").click();
      cy.contains("test cypress | | Chiranjibi");
    });

    describe("after a blog is created...", function () {
      beforeEach(function () {
        cy.contains("Create new blog").click();
        cy.get("#title").type("test cypress");
        cy.get("#author").type("Chiranjibi");
        cy.get("#url").type("www.testcypress.com");
        cy.get("#create").click();
      });

      it("can do view more and like the blog", function () {
        cy.get(".blogList")
          .eq(0)
          .contains("view more")
          .click()
          .get(".likes")
          .click();
      });

      it("can delete the blog", function () {
        cy.get(".blogList").eq(0).contains("Del").click();
        cy.get("html").should("not.contain", "test cypress | | Chiranjibi");
      });
    });

    describe("when many blogs are created", function () {
      beforeEach(function () {
        cy.contains("Create new blog").click();
        cy.get("#title").type("test cypress1");
        cy.get("#author").type("Chiranjibi");
        cy.get("#url").type("www.testcypress.com");
        cy.get("#create").click();

        cy.contains("Create new blog").click();
        cy.get("#title").type("test cypress2");
        cy.get("#author").type("Chiranjibi");
        cy.get("#url").type("www.testcypress.com");
        cy.get("#create").click();

        cy.contains("Create new blog").click();
        cy.get("#title").type("test cypress3");
        cy.get("#author").type("Chiranjibi");
        cy.get("#url").type("www.testcypress.com");
        cy.get("#create").click();

        cy.contains("Create new blog").click();
        cy.get("#title").type("test cypress4");
        cy.get("#author").type("Chiranjibi");
        cy.get("#url").type("www.testcypress.com");
        cy.get("#create").click();
      });

      it("blogs are listed according to number of likes", function () {
        cy.get("ul.blogList>li")
          .eq(1)
          .contains("view more")
          .click()
          .get(".likes")
          .dblclick({ multiple: true });

        cy.get("ul.blogList>li")
          .eq(2)
          .contains("view more")
          .click()
          .get(".likes")
          .click({ multiple: true });


        cy.get('ul.blogList>li').eq(0).contains('test cypress2')
        cy.get('ul.blogList>li').eq(1).contains('test cypress3')
        cy.get('ul.blogList>li').eq(2).contains('test cypress1')


      });
    });
  });
});
