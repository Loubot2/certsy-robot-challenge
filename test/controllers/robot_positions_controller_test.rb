require "test_helper"

class RobotPositionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @robot_position = robot_positions(:one)
  end

  test "should get index" do
    get robot_positions_url, as: :json
    assert_response :success
  end

  test "should create robot_position" do
    assert_difference("RobotPosition.count") do
      post robot_positions_url, params: { robot_position: { orientation: @robot_position.orientation, x: @robot_position.x, y: @robot_position.y } }, as: :json
    end

    assert_response :created
  end

  test "should show robot_position" do
    get robot_position_url(@robot_position), as: :json
    assert_response :success
  end

  test "should update robot_position" do
    patch robot_position_url(@robot_position), params: { robot_position: { orientation: @robot_position.orientation, x: @robot_position.x, y: @robot_position.y } }, as: :json
    assert_response :success
  end

  test "should destroy robot_position" do
    assert_difference("RobotPosition.count", -1) do
      delete robot_position_url(@robot_position), as: :json
    end

    assert_response :no_content
  end
end
