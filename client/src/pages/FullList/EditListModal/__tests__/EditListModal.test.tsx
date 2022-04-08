import {Button, Checkbox, Dialog} from "@material-ui/core";
import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import EditListModal from "../EditListModal";
import ManageMembersModal from "../ManageMembersModal/ManageMembersModal";
import {mockFullList} from "../../../../util/mockData/mockData";
import DeleteListModal from "../DeleteListModal/DeleteListModal";
import CreateListsModalInput from "../../../Lists/CreateListsModal/CreateListsModalInput/CreateListsModalInput";
import {ListActionType} from "../../../../store/ducks/list/contracts/actionTypes";

describe("EditListModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListStore = {...mockStore, list: {...mockStore.list, list: mockFullList}};
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty Edit List Modal window correctly", () => {
        const wrapper = mountWithStore(<EditListModal visible={false} onClose={jest.fn()}/>, mockListStore);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should render Edit List Modal window correctly", () => {
        const wrapper = mountWithStore(<EditListModal visible={true} onClose={jest.fn()}/>, mockListStore);

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes("Edit List")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Done")).toBe(true);
        expect(wrapper.text().includes("Make private")).toBe(true);
        expect(wrapper.text().includes("When you make a List private, only you can see it.")).toBe(true);
        expect(wrapper.text().includes("Manage members")).toBe(true);
        expect(wrapper.text().includes("Delete List")).toBe(true);
    });

    it("should open Manage Members Modal window", () => {
        const wrapper = mountWithStore(<EditListModal visible={true} onClose={jest.fn()}/>, mockListStore);
        const membersModalButton = wrapper.find("#onOpenManageMembersModal").at(0);
        membersModalButton.simulate("click");

        expect(wrapper.find(ManageMembersModal).prop("visible")).toBe(true);
    });

    it("should open Delete List Modal window", () => {
        const wrapper = mountWithStore(<EditListModal visible={true} onClose={jest.fn()}/>, mockListStore);
        const deleteModalButton = wrapper.find("#onOpenDeleteListModal").at(0);
        deleteModalButton.simulate("click");

        expect(wrapper.find(DeleteListModal).prop("visible")).toBe(true);
    });

    it("should submit edit list form", (done) => {
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(<EditListModal visible={true} onClose={mockOnClose}/>, mockListStore);
        const nameInput = wrapper.find(CreateListsModalInput).at(0).find("input").at(0);
        const descriptionInput = wrapper.find(CreateListsModalInput).at(1).find("textarea").at(0);
        const mockCheckbox = wrapper.find(Checkbox).at(0);
        nameInput.simulate("change", {target: {value: "Test name"}});
        descriptionInput.simulate("change", {target: {value: "Test description"}});
        mockCheckbox.simulate("change", {target: {checked: true}});
        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    description: "Test description",
                    id: 3,
                    isPrivate: false,
                    listOwner: {
                        avatar: {
                            id: mockFullList.listOwner.avatar.id,
                            src: mockFullList.listOwner.avatar.src
                        },
                        id: mockFullList.listOwner.id,
                        fullName: mockFullList.listOwner.fullName,
                        username: mockFullList.listOwner.username,
                        isPrivateProfile: false,
                    },
                    name: "Test name",
                    wallpaper: undefined
                },
                type: ListActionType.EDIT_LIST
            });
            expect(mockOnClose).toHaveBeenCalled();
        });
    });
});
