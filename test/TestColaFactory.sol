pragma solidity ^0.5.8;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ColaPresentation.sol";

contract TestColaFactory {
        address expectedOwner = address(this);
        ColaPresentation colaPresentation = ColaPresentation(DeployedAddresses.ColaPresentation());

        function testsetCooldownTime() public {
                uint32 expectedCooldownTime = 0 days;
                colaPresentation.setCooldownTime(expectedCooldownTime);
                uint32 returnedCooldownTime = colaPresentation.getCooldownTime();
                Assert.equal(uint(returnedCooldownTime), uint(expectedCooldownTime), "The cooldown time should be update.");
        }

        function testProduceRandomCola() public {
                colaPresentation.produceRandomCola("test");
                uint resultCount = colaPresentation.getCountByOwner(expectedOwner);
                uint expectedCount = 1;
                Assert.equal(resultCount, expectedCount, "The count should be updated.");
                string memory resultName;
                uint resultCode;
                uint8 resultLevel;
                uint32 resultReadyTime;
                (resultName, resultCode, resultLevel, resultReadyTime) =
                        colaPresentation.getColaByOwner(expectedOwner, uint(0));
                string memory expectedName = "test";
                uint expectedCode = uint(keccak256(abi.encodePacked("test"))) % (10**16);
                uint8 expectedLevel = 0;

                Assert.equal(resultName, expectedName, "The name of cola should be updated.");
                Assert.equal(resultCode, expectedCode, "The code of cola should be updated.");
                Assert.equal(uint(resultLevel), uint(expectedLevel), "The level of cola shoud be updated.");
        }

        function testMixCola() public {
                colaPresentation.produceRandomCola("cola");

                Assert.equal(uint(2), colaPresentation.getCountByOwner(expectedOwner), "There should be two colas.");

                colaPresentation.mixCola("cola3", 0, 1);

                Assert.equal(uint(3), colaPresentation.getCountByOwner(expectedOwner), "There should be three colas after mixture.");
                string memory resultName;
                uint resultCode;
                uint8 resultLevel;
                uint32 resultReadyTime;
                (resultName, resultCode, resultLevel, resultReadyTime) =
                        colaPresentation.getColaByOwner(expectedOwner, uint(2));
                string memory expectedName = "cola3";
                uint code1 = uint(keccak256(abi.encodePacked("test"))) % (10 ** 16); 
                uint code2 = uint(keccak256(abi.encodePacked("cola"))) % (10 ** 16);
                uint expectedCode = (code1 + code2) / 2;
                uint8 expectedLevel = 0;

                Assert.equal(resultName, expectedName, "The name of cola should be updated.");
                Assert.equal(resultCode, expectedCode, "The code of cola should be updated.");
                Assert.equal(uint(resultLevel), uint(expectedLevel), "The level of cola shoud be updated.");

        }
}
