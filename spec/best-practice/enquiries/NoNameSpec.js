/* global describe, beforeEach, afterEach, it, expect */

var api = require('../../../src/js/post-api-data')
var sinon = require('sinon')
var Model = require('../../../src/js/models/BestPracticeEnquiries')

describe('Best Practice Enquiries Model - no name entered', function () {
  const sut = new Model()
  let apiStub = null

  beforeEach(() => {
    apiStub = sinon.stub(api, 'post')
    apiStub
      .returns({
        then: function (success, error) {
          success({
            'status': 'created',
            'statusCode': 201
          })
        }
      })

    sut.name('')
    sut.orgName('org name')
    sut.email('email@test.com')
    sut.telephone('telephone')
    sut.message('message')
    sut.submit()
  })

  afterEach(() => {
    api.post.restore()
  })

  it('- should not post to api', () => {
    expect(apiStub.notCalled).toBeTruthy()
  })
})
