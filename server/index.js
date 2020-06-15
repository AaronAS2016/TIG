var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/clonar', function (req, res) {
    var nodegit = require("nodegit");
    var fse = require("fs-extra");
    var path = "C:\\Desarrollos\\test-escritura";

    fse.remove(path).then(function () {
        var entry;

        nodegit.Clone(
            "https://github.com/Jeremias98/test-escritura",
            path,
            {
                fetchOpts: {
                    callbacks: {
                        certificateCheck: function () {
                            // github will fail cert check on some OSX machines
                            // this overrides that check
                            return 0;
                        }
                    }
                }
            })
            .done(function (data) {
                console.log("Listorti");
                res.status(200).send(data);
            });
    });
});

app.get('/push', function (req, res) {
    var nodegit = require("nodegit");
    var path = require("path");
    var fse = require("fs-extra");

    var fileName = "newFile.txt";
    var fileContent = "hello world";

    var repoDir = "C:\\Desarrollos\\test-escritura";

    var repository;
    var remote;

    var signature = nodegit.Signature.now("Jeremias98",
        "ramirezjeremias98@gmail.com");

    // Create a new repository in a clean directory, and add our first file
    fse.remove(path.resolve(__dirname, repoDir))
        .then(function () {
            return fse.ensureDir(path.resolve(__dirname, repoDir));
        })
        .then(function () {
            return nodegit.Repository.init(path.resolve(__dirname, repoDir), 0);
        })
        .then(function (repo) {
            repository = repo;
            return fse.writeFile(path.join(repository.workdir(), fileName), fileContent);
        })

        // Load up the repository index and make our initial commit to HEAD
        .then(function () {
            return repository.refreshIndex();
        })
        .then(function (index) {
            return index.addByPath(fileName)
                .then(function () {
                    return index.write();
                })
                .then(function () {
                    return index.writeTree();
                });
        })
        .then(function (oid) {
            return repository.createCommit("HEAD", signature, signature,
                "initial commit", oid, []);
        })

        // Add a new remote
        .then(function () {
            return nodegit.Remote.create(repository, "origin",
                "git@github.com:Jeremias98/test-escritura.git")
                .then(function (remoteResult) {
                    remote = remoteResult;

                    // Create the push object for this remote
                    return remote.push(
                        ["refs/heads/master:refs/heads/master"],
                        {
                            callbacks: {
                                certificateCheck: function() { return 0; },
                                credentials: function (url, userName) {
                                    console.log(url)
                                    console.log(userName)
                                    // console.log(nodegit.Cred.sshKeyFromAgent(userName))
                                    return nodegit.Cred.sshKeyFromAgent(userName);
                                }
                            }
                        }
                    );
                });
        }).catch(ex => console.log(ex))
        .done(function () {
            console.log("Done!");
        });
});

app.get('/pull', function (req, res) {
    var nodegit = require("nodegit");
    var path = require("path");

    var repoDir = "C:\\Desarrollos\\test-escritura";

    var repository;

    // Open a repository that needs to be fetched and fast-forwarded
    nodegit.Repository.open(path.resolve(__dirname, repoDir))
        .then(function (repo) {
            repository = repo;

            return repository.fetchAll({
                callbacks: {
                    credentials: function (url, userName) {
                        return nodegit.Cred.sshKeyFromAgent(userName);
                    },
                    certificateCheck: function () {
                        return 0;
                    }
                }
            });
        })
        // Now that we're finished fetching, go ahead and merge our local branch
        // with the new one
        .then(function () {
            return repository.mergeBranches("master", "origin/master");
        })
        .done(function () {
            console.log("Done!");
            res.status(200).send("Done!");
        });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});